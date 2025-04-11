import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']

})
export class SidebarComponent {
  router = inject(Router);
  activeIndex = 0;

  ngOnInit() {
    const currentUrl = this.router.url;

    if (currentUrl.includes('/profile')) {
      this.activeIndex = 0;
    }
    else if (currentUrl.includes('/chat')) {
      this.activeIndex = 1;
    } else if (currentUrl.includes('/contacts')) {
      this.activeIndex = 2;
    } else if (currentUrl.includes('/auth')) {
      this.activeIndex = 3;
    }
  }

  onNavigate(index: number) {
    this.activeIndex = index;

    if (index === 0) {
      this.router.navigateByUrl('/profile');
    } else if (index === 1) {
      this.router.navigateByUrl('/chat');
    } else if (index === 2) {
      this.router.navigateByUrl('/contacts');
    } else if (index === 3) {
      this.router.navigateByUrl('/auth', { replaceUrl: true });
    }
  }
}

