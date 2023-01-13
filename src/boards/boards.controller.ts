import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe, Logger } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
    
@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
    private logger = new Logger('BoardsController')
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(
        @GetUser() user: User
    ): Promise<Board[]>{
       this.logger.verbose(`User ${user.username} trying to get all boards`);
       return this.boardsService.getAllBoards(user);
    }
    
    // @Get('/')
    // getAllBoard(): Board[]{
    //     return this.boardsService.getAllBoards();
    // }

    @Post()
    @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: createBoardDto, @GetUser() user: User): Promise<Board>{
        this.logger.verbose(`User ${user.username} creating a new board.
        payload: ${JSON.stringify(createBoardDto)} `)
        return this.boardsService.createBoard(CreateBoardDto, user);
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(
    //     @Body() createBoardDto: createBoardDto
    // ): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board>{
        return this.boardsService.getBoardById(id);
    }

    // @Get('/:id')
    // getBoardById(@Param('id') id:string): Board{
    //     return this.boardsService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoard(@Param('id', ParseIntPipe) id,
    @GetUser() user: User
    ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }
    // @Delete(':/id')
    // deleteBoard(@Param('id') id: string): void{
    //     this.boardsService.deleteBoard(id);
    // }
    
    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ){
        return this.boardsService.updateBoardStatus(id, status);
    }

    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ){
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}