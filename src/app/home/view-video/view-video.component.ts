import { EncryptionUtil } from './../../v-share/util/encryption-util';
import { LOCAL_STORAGE } from './../../v-share/constants/common.const';
import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { Utils } from 'src/app/v-share/util/utils.static';
import { environment } from 'src/environments/environment';
declare const $: any;


@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {


  urlComplete = {
    mainUrl : '',
    subUrl : '',
    childUrl : ''
  };


  constructor(private router: Router) {

    this.router.events.subscribe((event: Event) => {
      if ( event instanceof NavigationEnd) {
        const url = event.url.split('/');
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
      }
    });
  }

  public lstTasks: any[] = [];
  public lstProgress: any[] = [];
  public lstCompleted: any[] = [];
  public lstInprogress: any[]= [];
  public lstHold: any[] = [];
  public lstReview: any[] = [];
  public url: any = "taskboard";
  public droppedItems: any[] = [];
  public addTaskboardFrom: any;
  onItemDrop(e: any) {
    // Get the dropped data here

    this.droppedItems.push(e.dragData);
  }

  ngOnInit() {
    this.loadTask();
    (this.lstProgress = [
      {
        id: 1,
        taskname: "John deo",
        taskpriority: "Medium",
        duedate: "02-05-2020",
        followers: "John deo",
        status: "Active",
      },
    ]),
      (this.lstCompleted = [
        {
          id: 1,
          taskname: "John smith",
          taskpriority: "Low",
          duedate: "15-08-2020",
          followers: "John deo",
          status: "Active",
        },
      ]),
      (this.lstInprogress = [
        {
          id: 1,
          taskname: "John deo",
          taskpriority: "Medium",
          duedate: "02-05-2020",
          followers: "John deo",
          status: "Active",
        },
      ]);
    (this.lstHold = [
      {
        id: 1,
        taskname: "John deo",
        taskpriority: "Medium",
        duedate: "02-05-2020",
        followers: "John deo",
        status: "Active",
      },
    ]),
      (this.lstReview = [
        {
          id: 1,
          taskname: "John deo",
          taskpriority: "Medium",
          duedate: "02-05-2020",
          followers: "John deo",
          status: "Active",
        },
      ]),
      (this.droppedItems = [
        {
          id: 1,
          taskname: "website redesign",
          taskpriority: "Medium",
          duedate: "02-05-2020",
          followers: "John deo",
          status: "Active",
        },
        {
          id: 2,
          taskname: "Make a wireframe",
          taskpriority: "High",
          duedate: "02-05-2020",
          followers: "Richard deo",
          status: "Active",
        },
      ]);
    if ($('[data-toggle="tooltip"]').length > 0) {
      $('[data-toggle="tooltip"]').tooltip();
    }


  }

  addTaskboard() {
    $("#add_task_modal").modal("hide");
  }

  onDrop(event: any) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    } else {
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex
      // );
    }
  }

  // // Get tasks  Api Call
  loadTask() {
    this.lstTasks = taskboard;
  }

  onsubmit() {
    $("#add_task_board").modal("hide");
  }
  onSubmitUser() {
    $("#assign_user").modal("hide");
  }

  onSubmitLeader() {
    $("#assign_leader").modal("hide");
  }

}


export const taskboard = [
  {
    id: 1,
    taskname: "John deo",
    taskpriority: "Medium",
    duedate: "02-05-2020",
    followers: "John deo",
    status: "Active",
  },
  {
    id: 2,
    taskname: "John Mclaren",
    taskpriority: "Low",
    duedate: "02-10-2020",
    followers: "Richard Williams",
    status: "Active",
  },
  {
    id: 3,
    taskname: "Kennedy",
    taskpriority: "High",
    duedate: "05-11-2020",
    followers: "Richard deo",
    status: "Active",
  },
  {
    id: 4,
    taskname: "Barry cuda",
    taskpriority: "Medium",
    duedate: "02-05-2020",
    followers: "Williams",
    status: "Active",
  },
  {
    id: 5,
    taskname: "Joshy",
    taskpriority: "High",
    duedate: "02-05-2020",
    followers: "Loren",
    status: "Active",
  },
  {
    id: 6,
    taskname: "Hector",
    taskpriority: "Medium",
    duedate: "25-10-2020",
    followers: "Rihanna",
    status: "Active",
  },
];
