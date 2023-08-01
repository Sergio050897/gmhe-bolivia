import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { TokenStorageService } from 'src/app/core/authentication/token-storage.service';
import { SidebarService } from '../sidebar/sidebar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  user: any;

  constructor(
    public sidebarservice: SidebarService,
    private authenticationService: AuthenticationService,
    private tokenStorageService: TokenStorageService,
    private toastr: ToastrService, // mensajes de confirmacion
    private router: Router,
  ) { }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }

  ngOnInit() {

    /* Search Bar */
    $(document).ready(function () {
      $(".mobile-search-icon").on("click", function () {
        $(".search-bar").addClass("full-search-bar")
      }),
        $(".search-close").on("click", function () {
          $(".search-bar").removeClass("full-search-bar")
        })
    });

    this.user = this.tokenStorageService.getUser();
  }

  logout(){
    this.authenticationService.logout().subscribe(
      (data: any) => {
        this.tokenStorageService.signOut();
        this.router.navigate(['/auth/sign-in']);
        // this.disableScroll = true;
      },
      error => {
        console.log('error ' + error);
        this.toastr.error(error.error, 'Error');
      }
    );
  }
}
