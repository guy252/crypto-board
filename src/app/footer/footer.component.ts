import {Component} from '@angular/core';

import * as globalConstants from '../constants/const.global';

@Component({
  moduleId: module.id,
  selector: 'footer-navbar',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css']
})

export class FooterComponent {
  supportEmailAddress = globalConstants.EMAIL_ADDRESS_SUPPORT;
}

