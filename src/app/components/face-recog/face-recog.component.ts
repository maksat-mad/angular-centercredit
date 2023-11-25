import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-face-recog',
  templateUrl: './face-recog.component.html',
  styleUrls: ['./face-recog.component.scss']
})
export class FaceRecogComponent implements OnInit {

  pay = false;
  clicked = false;
  router = inject(Router);

  WIDTH = 440;
  HEIGHT = 280;
  @ViewChild('video',{ static: true }) public video!: ElementRef;
  @ViewChild('canvas',{ static: true }) public canvasRef!: ElementRef;
  constructor(private elRef: ElementRef, private renderer: Renderer2, private route: ActivatedRoute) {}
  stream: any;
  detection: any;
  resizedDetections: any;
  canvas: any;
  canvasEl: any;
  displaySize: any;
  videoInput: any;

  money: number = 0;

  async ngOnInit() {
    await Promise.all(
      [faceapi.nets.tinyFaceDetector.loadFromUri('../../assets/models'),
        await faceapi.nets.faceLandmark68Net.loadFromUri('../../assets/models'),
        await faceapi.nets.faceRecognitionNet.loadFromUri('../../assets/models'),
        await faceapi.nets.faceExpressionNet.loadFromUri('../../assets/models'),]
    ).then(() => this.startVideo());
  }

  startVideo() {
    this.videoInput = this.video.nativeElement;
    window.navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        this.videoInput.srcObject = stream;
      })
      // (err: any) => console.log(err);
    this.detect_Faces();
  }

  async detect_Faces() {
    this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => {
     this.canvas = await faceapi.createCanvasFromMedia(this.videoInput);
     this.canvasEl = this.canvasRef.nativeElement;
     this.canvasEl.appendChild(this.canvas);
     this.canvas.setAttribute('id', 'canvass');
     this.canvas.setAttribute(
        'style',`position: fixed;
        top: 100px;
        left: 0;`
     );
     this.displaySize = {
        width: this.videoInput.width,
        height: this.videoInput.height, };
     faceapi.matchDimensions(this.canvas, this.displaySize);
     setInterval(async () => {
       this.detection = await faceapi.detectAllFaces(this.videoInput,  new  faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
       this.resizedDetections = faceapi.resizeResults(
          this.detection,
          this.displaySize
        );
       this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width,this.canvas.height);
       faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
       faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
       faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);
    }, 100);
    });
  }

  async handleSubmit() {
    this.clicked = !this.clicked;
    this.renderer.setStyle(this.canvasRef.nativeElement, 'display', 'none');
    await setTimeout(() => {
      this.pay = !this.pay;
      this.renderer.setStyle(this.video.nativeElement, 'display', 'none');

      // Set display: none for canvasRef element
      this.renderer.setStyle(this.canvasRef.nativeElement, 'display', 'none');
      this.clicked = !this.clicked;
    }, 2000);
  }

  handleBack() {
    this.router.navigateByUrl("/");
  }
}
