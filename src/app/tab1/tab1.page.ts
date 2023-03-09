import { Component } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import homeData from '../../assets/mockdata/home.json';
import { ModalPage } from '../modal/modal.page';
import { DrawerService } from '../services/drawer.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  title = '';
  isOpenModal = false;
  sections = homeData.sections;
  spotlight = homeData.spotlight;

  opt = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    freeMode: true,
  };

  constructor(
    private modalCtrl: ModalController,
    private drawerService: DrawerService,
    private animationCtrl: AnimationController
  ) {}

  async openCategories() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'transparent-modal',
      enterAnimation: this.enterAnimation,
      leaveAnimation: this.leaveAnimation,
    });

    await modal.present();
  }

  openModal(series, isOpen) {
    // this.drawerService.openDrawer(series.title);
    this.title = series.title;
    this.isOpenModal = isOpen;
  }

  //ModalAnimation
  enterAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;

    const backdropAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

    const wrapperAnimation = this.animationCtrl
      .create()
      .addElement(root.querySelector('.modal-wrapper')!)
      .keyframes([
        { offset: 0, opacity: '0', transform: 'scale(0)' },
        { offset: 1, opacity: '0.99', transform: 'scale(1)' },
      ]);

    return this.animationCtrl
      .create()
      .addElement(baseEl)
      .easing('cubic-bezier(0.32,0.72,0,1)')
      .duration(500)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };

  leaveAnimation = (baseEl: HTMLElement) => {
    return this.enterAnimation(baseEl).direction('reverse');
  };
  //End

  closeDrawer() {}
}
