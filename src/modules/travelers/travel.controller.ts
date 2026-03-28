import { NextRequest } from 'next/server';
import * as travelInfoService from './travel.service'
import { requireUser } from '@/middleware/auth';
import { CreateTravelInfoInput, UpdateTravelInfoInput } from '@/types/travelInfo.type';

export async function createTravelInfo(req: NextRequest) {
  const userId = requireUser(req)
  const data = await req.json() as CreateTravelInfoInput
  const payload = {
    ...data,
    travelerId: userId
  }

  const { travelerInfo } = await travelInfoService.createTravelInfo(payload)
  return { travelerInfo }
}

export async function getTravelInfosByTravelerId(req: NextRequest) {
  const userId = requireUser(req)
  const travelerInfos = await travelInfoService.getTravelInfosByTravelerId(userId)
  return { travelerInfos }
}

export async function getAllTravelsInfo() {
  const travelInfos = await travelInfoService.getAllTravelsInfo()
  return { travelInfos: travelInfos || [] }
}

export async function updateTravelInfo(req: NextRequest, id: string) {
  const userId = requireUser(req)
  const data = await req.json() as UpdateTravelInfoInput
  const { updatedTravel } = await travelInfoService.updateTravelInfo(id, userId, data)
  return { updatedTravel }
}
