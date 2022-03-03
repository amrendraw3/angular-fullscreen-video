import { Component, OnInit,ElementRef,ViewChild,Input } from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
	muted:boolean = true;
	
	isMobileWidth = false;
	@Input() options: {
		mute: false,
		fluid: boolean,
		aspectRatio: string,
		autoplay: boolean,
		sources: {
			src: string,
			type: string,
			controls: false,
		}[],
	};
	
player: videojs.Player;
@ViewChild('targetWeb', {static: true}) targetWeb: ElementRef;
@ViewChild('targetMobile', {static: true}) targetMobile: ElementRef;
constructor() { }

ngOnInit(): void {
	setTimeout(() => {
		if (this.isMobileWidth) {
		this.player = videojs(this.targetMobile.nativeElement, this.options, function onPlayerReady() {
			console.log('onPlayerReady', this);
		});
		} else {
		this.player = videojs(this.targetWeb.nativeElement, this.options, function onPlayerReady() {
			console.log('onPlayerReady', this);
		});
		}
	})
}

volumeBtn(){
	this.muted = !this.muted;
	console.log('this.muted: ', this.muted)
	// alert(this.muted);
	this.player.muted(this.muted);
  }
}
