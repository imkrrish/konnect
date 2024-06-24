import { UpdateMeetingDto } from './dto/updateMeeting.dto';
import { CreateMeetingDto } from './dto/createMeeting.dto';
import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meeting } from './schemas/meeting.schema';
import { Model } from 'mongoose';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting.name) private MeetingModal: Model<Meeting>,
  ) {}

  async createMeeting(createMeetingDto: CreateMeetingDto) {
    const createdMeeting = new this.MeetingModal(createMeetingDto);
    return await createdMeeting.save();
  }

  async updateMeeting(updateMeetingDto: UpdateMeetingDto) {
    const filter = { _id: updateMeetingDto.id };
    const update = {
      title: updateMeetingDto.title,
      participants: updateMeetingDto.participants,
      startTime: updateMeetingDto.startTime,
      endTime: updateMeetingDto.endTime,
    };
    return await this.MeetingModal.findOneAndUpdate(filter, update, {
      new: true,
    })
      .lean()
      .exec();
  }

  async getMeetings(hostId: string) {
    return await this.MeetingModal.find({ host: hostId }).lean().exec();
  }

  async getMeeting(meetingId: string) {
    return await this.MeetingModal.findOne({ _id: meetingId }).lean().exec();
  }

  async deleteMeeting(meetingId: string) {
    return await this.MeetingModal.findOneAndDelete({ _id: meetingId })
      .lean()
      .exec();
  }
}
