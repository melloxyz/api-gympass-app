import type { Prisma } from "@prisma/client";
import type { CheckIn } from '@prisma/client';

export interface CheckInsRepository {
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
    findByUserIdAndDate(userId: string, date: Date): Promise<CheckIn | null>;
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;

}