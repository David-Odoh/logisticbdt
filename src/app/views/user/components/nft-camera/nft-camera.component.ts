import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'nft-camera',
  templateUrl: './nft-camera.component.html',
  styleUrls: ['./nft-camera.component.scss']
})
export class NftCameraComponent implements OnInit {
  private trigger: Subject<void> = new Subject<void>();

  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<void> = new Subject<void>();
  
  @Output() capturedImage  = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
  public triggerSnapshot(): void {
      this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
      this.webcamImage = webcamImage;
      this.capturedImage.emit(webcamImage!.imageAsDataUrl);
      console.info('received webcam image', this.capturedImage);
  }

  public get triggerObservable(): Observable<void> {
      return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<void> {
      return this.nextWebcam.asObservable();
  }

}
