import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { randomUUID, UUID } from 'node:crypto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  private _profiles = [
    { id: randomUUID(), name: 'Michele', description: 'Fullstack Developer' },
    { id: randomUUID(), name: 'Luca', description: 'Fullstack Developer' },
    { id: randomUUID(), name: 'Matteo', description: 'BE Developer' },
    { id: randomUUID(), name: 'Giuseppe', description: 'FE Developer' },
  ];

  findAll() {
    return this._profiles;
  }

  findOne(id: UUID) {
    const profile = this._profiles.find((profile) => profile.id === id);
    if (!profile) {
      return new NotFoundException(`Profile with id ${id} not found`);
    }
    return profile;
  }

  remove(id: UUID) {
    const toRemoveIndex = this._profiles.findIndex((p) => p.id === id);
    if (toRemoveIndex === -1) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    } else {
      this._profiles.splice(toRemoveIndex, 1);
    }
  }

  create(profile: CreateProfileDto) {
    const newProfile = { id: randomUUID(), ...profile };
    this._profiles.push(newProfile);
    return newProfile;
  }

  update(id: UUID, profile: UpdateProfileDto) {
    let toUpdate = this._profiles.find((p) => p.id === id);
    if (!toUpdate) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    } else {
      toUpdate = { ...toUpdate, ...profile };
      return toUpdate;
    }
  }
}
