import { Component, OnInit } from '@angular/core';
import { User, UserService } from 'src/app/core';
import { Toast } from 'src/app/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit 
{
  allUsers!:User[];
  constructor(private userService:UserService) { 
    this.get();
  }
  get()
  {
    this.userService.getAllUsers('/users/get/all').subscribe
    (
      res=>
      {
        this.allUsers=res.data.users;
        console.log(this.allUsers)
      },
      err=>
      {
        alert('nai chala')
      }
    ) 
  }
  ngOnInit(): void {

  }
  deleteUser(email:string)
  {
    Swal.fire({
        title: "Are you sure?",
        text: "you wanna delete this user.",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Delete it!",
        cancelButtonText: "No, cancel please!",
      }).then(({isConfirmed}) => {
        if (isConfirmed) {
          this.userService.deleteUser(email).subscribe
          (
      
            res=>
            {
              if(res.status==200)
              {
                this.get();
                Toast.fire({
                  icon: 'success',
                  title: 'User deleted in successfully'
                })

              }
            }
          )
        } else {
          Swal.fire("Cancelled", "Your user is safe :)", "error");
        }
      });
    }
    blockUser(email:string)
  {
    Swal.fire({
        title: "Are you sure?",
        text: "you wanna block this user.",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, Block it!",
        cancelButtonText: "No, cancel please!",
      }).then(({isConfirmed}) => {
        if (isConfirmed) {
          this.userService.blockUser(email).subscribe
          (
      
            res=>
            {
              if(res.status==200)
              {
                this.get();
                Toast.fire({
                  icon: 'success',
                  title: 'User Blocked in successfully'
                })

              }
            }
          )
        } else {
          Swal.fire("Cancelled", "Your user is safe :)", "error");
        }
      });
    }
  
    
}

