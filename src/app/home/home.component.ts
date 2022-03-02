import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import videojs from 'video.js';



interface documents extends Document {
	fullscreenElement: any;
	mozFullscreenElement: any;
	webkitFullscreenElement: any;
	msFullscreenElement: any
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  muted:boolean = false
  player: videojs.Player;
  constructor() { }

  ngOnInit(): void {
    let fsdDocument = <documents>document
		$(fsdDocument).bind('fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange', function (e) {
			var fullscreenElement = fsdDocument.fullscreenElement || fsdDocument.webkitFullscreenElement || fsdDocument.mozFullscreenElement || fsdDocument.msFullscreenElement;

			if (!fullscreenElement) {
				// Leaving full-screen mode...
				const elem: any = document.getElementById("myvideo");
				elem.pause();
			} else {
				// Entering full-screen mode..
			}
		});
	}

	volumeBtn(){
		const elem: any = document.getElementById("full-video");
		elem.muted= !elem.muted;
		this.muted = !this.muted;
	  }

  ngOnDestroy() {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }
	playVideo() {
		const elem: any = document.getElementById("myvideo");
		elem.currentTime = 0;
		elem.play();

		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.webkitRequestFullscreen) { /* Safari */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { /* IE11 */
			elem.msRequestFullscreen();
		}
  }

}
