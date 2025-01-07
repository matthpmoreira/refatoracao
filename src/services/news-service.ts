import prisma from "../database";
import * as newsRepository from "../repositories/news-repository";
import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

function NotFoundError(id: number) {
  return {
    name: "NotFound",
    message: `News with id ${id} not found.`
  };
}

function ConflictError(title: string) {
  return {
    name: "Conflict",
    message: `News with title ${title} already exist`
  }
}

function BadRequestError(message: string) {
  return { name: "BadRequest", message };
}

export async function getNews(page: number, order: "asc" | "desc", title: string) {
  return newsRepository.getNews(page, order, title);
}

export async function getSpecificNews(id: number) {
  const news = await newsRepository.getNewsById(id);
  if (news == null) {
    throw NotFoundError(id);
  }

  return news;
}

export async function createNews(newsData: CreateNewsData) {
  await validate(newsData);
  return newsRepository.createNews(newsData);
}

export async function alterNews(id: number, newsData: AlterNewsData) {
  const news = await getSpecificNews(id);
  const isNew = news.title !== newsData.title;
  await validate(newsData, isNew);

  return newsRepository.updateNews(id, newsData);
}

export async function deleteNews(id: number) {
  await getSpecificNews(id);
  return newsRepository.removeNews(id);
}

async function validate(newsData: CreateNewsData, isNew = true) {
  if (isNew) {
    await assertDoesNotExist(newsData.title)
  }

  assertTextNotShort(newsData.text);
  assertDateNotInPast(new Date(newsData.publicationDate));
}

async function assertDoesNotExist(title: string) {
  const newsWithTitle = await prisma.news.findFirst({ where: { title }});

  if (newsWithTitle != null) {
    throw ConflictError(title);
  }
}

function assertTextNotShort(text: string) {
  if (text.length < 500) {
    throw BadRequestError("The news text must be at least 500 characters long.");
  }
}

function assertDateNotInPast(publicationDate: Date) {
  const currentDate = new Date();

  if (publicationDate.getTime() < currentDate.getTime()) {
    throw BadRequestError("The publication date cannot be in the past.");
  }
}
