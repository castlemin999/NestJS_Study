import { createBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardStatus } from './board-status.enum';
import { stat } from 'fs';

@Injectable()
export class BoardsService {
    constructor(private boardRepository: BoardRepository){}

    async getAllBoards(): Promise<Board[]>{
        return this.boardRepository.find();
    }

    // getAllBoards(): Board[]{
    //     return this.boards;
    // }

    createBoard(createBoardDto: createBoardDto): Promise<Board>{
        return this.boardRepository.createBoard(createBoardDto);
    }

    // createBoard(createBoardDto: createBoardDto){
    //     const {title, description} = createBoardDto;

    //     const board : Board = {
    //         id: uuid(),
    //         title : title,
    //         description : description,
    //         status : BoardStatus.PUBLIC
    //     }

    //     this.boards.push(board);
    //     return board;
    // }

    async getBoardById(id: number): Promise<Board>{
        const found = await this.boardRepository.findOne({where: {id}});

        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }

        return found;
    }

    // getBoardById(id: string): Board {
    //     const found = this.boards.find((board) => board.id === id);
    //     if(!found){
    //         throw new NotFoundException(`Cant't find Board with id ${id}`);
    //     }
    //     return found;
    // }

    async deleteBoard(id: number): Promise<void>{
        const result = await this.boardRepository.delete(id);
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    // deleteBoard(id: string): void{
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board => board.id !== found.id));
    // }
    
    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board>{
        const board = await this.getBoardById(id);
        
        board.status = status;
        await this.boardRepository.save(board);

        return board;
    }

    // updateBoardStatus(id: string, status: BoardStatus): Board{
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }

}
