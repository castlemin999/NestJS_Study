import { createBoardDto } from './dto/create-board.dto';
import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from './board-status.enum';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board>{
    async createBoard(createBoardDto: createBoardDto): Promise<Board>{
        const {title, description} = createBoardDto;

        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC
        })

        await this.save(board);
        return board;
    }
}