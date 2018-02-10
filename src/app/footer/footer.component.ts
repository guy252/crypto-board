import {Component} from '@angular/core';
import  {SOCIAL_NETWORKS} from "../constants/social";

@Component({
  moduleId: module.id,
  selector: 'footer-navbar',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})

export class FooterComponent {
  shareToFacebook() {
    const facebookLink = SOCIAL_NETWORKS.facebook.fbUrl +
      "?s=100&p[url]=" +
      SOCIAL_NETWORKS.facebook.websiteUrl +
      "&p[images][0]=&p[title]=" +
      SOCIAL_NETWORKS.facebook.messageTitle +
      "&p[summary]=" +
      SOCIAL_NETWORKS.facebook.message;

    window.open(facebookLink, '_blank', 'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=250');
    return false
  }

  shareToTwitter() {
    const twitterLink = SOCIAL_NETWORKS.twitter.twrUrl +
      "?text=" +
      SOCIAL_NETWORKS.twitter.message;

    window.open(twitterLink, '_blank');
    return false;
  }

  shareToWhatsapp() {
    //data-action="share/whatsapp/share"
    const whatsappLink = SOCIAL_NETWORKS.whatsapp.waUrl +
      "?text=" +
      SOCIAL_NETWORKS.whatsapp.message;
    window.open(whatsappLink, '_blank');
    return false;
  }

  shareToTelegram() {
    const telegramLink = SOCIAL_NETWORKS.telegram.tgUrl +
      "?url=" +
      SOCIAL_NETWORKS.telegram.websiteUrl +
      "&text=" +
      SOCIAL_NETWORKS.telegram.message;

    window.open(telegramLink, '_blank');
    return false;
  }
}

