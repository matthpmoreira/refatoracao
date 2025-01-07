import { Request, Response } from "express";
import httpStatus, {BAD_REQUEST} from "http-status";

import * as service from "./../services/news-service";

import { AlterNewsData, CreateNewsData } from "../repositories/news-repository";

export async function getNews(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const order = req.query.order || "desc";
  const title = req.query.title || "";

  if (!isPageValid(page)) {
    return res.status(httpStatus.BAD_REQUEST).send("Page is not valid.");
  }

  if (!isOrderValid(order)) {
    return res.status(httpStatus.BAD_REQUEST).send("Search order is not valid.");
  }

  if (!isTitleValid(title)) {
    return res.status(httpStatus.BAD_REQUEST).send("Title is not valid.")
  }

  const news = await service.getNews(page, order, title);
  return res.send(news);
}

export async function getSpecificNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (!isIdValid(id)) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const news = await service.getSpecificNews(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as CreateNewsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (!isIdValid(id)) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const newsData = req.body as AlterNewsData;
  const alteredNews = await service.alterNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (!isIdValid(id)) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  await service.deleteNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}

function isIdValid(id: number) {
  return !isNaN(id) && id > 0;
}

function isPageValid(page: number) {
  return page > 0;
}

function isOrderValid(order: unknown): order is "asc" | "desc" {
  return order === "asc" || order === "desc";
}

function isTitleValid(title: unknown): title is string {
  return typeof title === "string";
}
