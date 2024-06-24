import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/createMeeting.dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateMeetingDto } from './dto/updateMeeting.dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  async createMeeting(
    @Body() createMeetingDto: CreateMeetingDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const hostId = user._id;

    const meeting = await this.meetingsService.createMeeting({
      ...createMeetingDto,
      host: hostId as string,
    });

    if (!meeting) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        isSuccess: false,
        message: 'Failed to create meeting',
      });
    }

    return res.status(HttpStatus.CREATED).json({
      isSuccess: true,
      data: meeting,
    });
  }

  @UseGuards(JWTAuthGuard)
  @Put('update')
  async updateMeeting(
    @Body() updateMeetingDto: UpdateMeetingDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const hostId = user._id.toString();

    const meeting = await this.meetingsService.getMeeting(updateMeetingDto.id);

    if (!meeting) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        isSuccess: false,
        message: 'Meeting not found',
      });
    }

    if (meeting.host.toString() !== hostId) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        isSuccess: false,
        message: 'You are not authorized to update this meeting',
      });
    }

    const updatedMeeting =
      await this.meetingsService.updateMeeting(updateMeetingDto);

    if (!updatedMeeting) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        isSuccess: false,
        message: 'Failed to update meeting',
      });
    }

    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      data: updatedMeeting,
    });
  }

  @UseGuards(JWTAuthGuard)
  @Get('get')
  async getMeetings(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const hostId = user._id;

    const meetings = await this.meetingsService.getMeetings(hostId as string);

    if (!meetings) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        isSuccess: false,
        message: 'Failed to get meetings',
      });
    }

    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      data: meetings,
    });
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':meetingId')
  async deleteMeeting(
    @Param() { meetingId }: { meetingId: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    const hostId = user._id.toString();

    const meeting = await this.meetingsService.getMeeting(meetingId);

    if (!meeting) {
      return res.status(HttpStatus.NOT_FOUND).json({
        isSuccess: false,
        message: 'Meeting not found',
      });
    }

    if (meeting.host.toString() !== hostId) {
      return res.status(HttpStatus.FORBIDDEN).json({
        isSuccess: false,
        message: 'You are not authorized to delete this meeting',
      });
    }

    const deletedMeeting = await this.meetingsService.deleteMeeting(meetingId);

    if (!deletedMeeting) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        isSuccess: false,
        message: 'Failed to delete meeting',
      });
    }

    return res.status(HttpStatus.OK).json({
      isSuccess: true,
      data: deletedMeeting,
    });
  }
}
