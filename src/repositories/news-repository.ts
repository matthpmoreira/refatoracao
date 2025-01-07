import prisma from "./../database";
import { News } from "@prisma/client";

export type CreateNewsData = Omit<News, "id" | "createAt">;
export type AlterNewsData = CreateNewsData;

export function getNews(page: number, order: "asc" | "desc", title: string) {
  const take = 10;
  const skip = take * (page - 1);

  return prisma.news.findMany({
    skip, take,
    orderBy: {
      publicationDate: order
    },
    where: {
      title: {
        contains: title
      }
    }
  });
}

export function getNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id }
  })
}

export async function createNews(newsData: CreateNewsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) }
  });
}

export async function updateNews(id: number, news: AlterNewsData) {
  return prisma.news.update({
    where: { id },
    data: { ...news, publicationDate: new Date(news.publicationDate) }
  })
}

export async function removeNews(id: number) {
  return prisma.news.delete({
    where: { id }
  })
}
