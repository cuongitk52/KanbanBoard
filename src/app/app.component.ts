import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Column } from '../app/Column.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  board: Column[];
  ngOnInit() {
    if (localStorage.getItem('board')) {
      this.board = JSON.parse(localStorage.getItem('board'));
    } else {
      this.LoadBoard();
    }
  }
  LoadBoard() {
    this.board = [
      {
        id: '1',
        name: 'TO DO',
        itemArray: [
          'Get to work',
          'Pick up groceries',
          'Go home',
          'Fall asleep',
        ],
      },
      {
        id: '2',
        name: 'DOING',
        itemArray: [
          'Get up',
          'Brush teeth',
          'Take a shower',
          'Check e-mail',
          'Walk dog',
        ],
      },
    ];
  }
  inputItem: string = '';
  newListName: string = '';
  constructor(public dialog: MatDialog) {}

  openDialog(): void {}

  AddItem(index, input: HTMLInputElement) {
    if (input.value !== '') {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '400px',
        data: { modalTitle: 'Bạn có muốn thêm task?' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.board[index].itemArray.push(input.value);
          localStorage.setItem('board', JSON.stringify(this.board));
        }
        input.value = '';
      });
    }
  }

  AddList(input: HTMLInputElement) {
    if (input.value !== '') {
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '400px',
        data: { modalTitle: 'Bạn có muốn thêm column?' },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          let column: Column = {
            id: '',
            name: input.value,
            itemArray: [],
          };
          this.board.push(column);
          localStorage.setItem('board', JSON.stringify(this.board));
        }
        input.value = '';
      });
    }
  }

  DeleteItem(indexColumn, indexItem) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { modalTitle: 'Bạn có muốn xóa task?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.board[indexColumn].itemArray.splice(indexItem, 1);
        localStorage.setItem('board', JSON.stringify(this.board));
      }
    });
  }

  DeleteColumn(indexColumn) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { modalTitle: 'Bạn có muốn xóa column?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.board.splice(indexColumn, 1);
        localStorage.setItem('board', JSON.stringify(this.board));
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
