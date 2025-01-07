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

export async function getNews() {
  return newsRepository.getNews();
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
  // validate if news with specific text already exists
  if (isNew) {
    const newsWithTitle = await prisma.news.findFirst({
      where: { title: newsData.title }
    });

    if (newsWithTitle) {
      throw ConflictError(newsData.title);
    }
  }

  // checks news text length
  if (newsData.text.length < 500) {
    throw BadRequestError("The news text must be at least 500 characters long.");
  }

  // checks date
  const currentDate = new Date();
  const publicationDate = new Date(newsData.publicationDate);
  if (publicationDate.getTime() < currentDate.getTime()) {
    throw BadRequestError("The publication date cannot be in the past.");
  }
}
