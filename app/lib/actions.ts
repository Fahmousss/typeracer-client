// actions.ts

"use server";

import { auth } from "./auth";
import prisma from "./db"; // Assuming you have a Prisma instance

// Server action to handle inserting the result into the database
export async function insertResultToDB(
  userId: string,
  wpm: number,
  cpm: number
) {
  // You would typically get the user's ID from a session or some other mechanism
  try {
    await prisma.record.create({
      data: {
        userId,
        wpm,
        cpm,
      },
    });
    console.log("Result inserted successfully");
  } catch (error) {
    console.error("Error inserting result:", error);
  }
}

export async function getUserRecords() {
  const session = await auth();

  if (!session || !session.user?.id) {
    throw new Error("User not authenticated");
  }

  const userId = session.user.id;

  // Query to get all records associated with the userId
  const records = await prisma.record.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc", // Optional: Order by createdAt, newest first
    },
    take: 3,
    include: {
      user: {
        select: {
          name: true,
        },
      },
    }, // Limit to the top 3 records
  });

  return records;
}

export async function getTop3Record() {
  try {
    const top3Records = await prisma.record.findMany({
      orderBy: {
        wpm: "desc", // Or 'cpm' if you prefer to rank by CPM
      },
      take: 3,
      include: {
        user: {
          select: {
            name: true,
          },
        },
      }, // Limit to the top 3 records
    });

    return top3Records;
  } catch (error) {
    console.error("Error fetching top 3 records:", error);
    return null;
  }
}
