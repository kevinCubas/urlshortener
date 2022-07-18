import { Request, Response } from "express";
import shortid from "shortid";
import { config } from "../config/Constants";
import { URLModel } from "../database/model/URL";

export class URLcontroller {
  public async shorten(req: Request, res: Response): Promise<void> {
    // VERIFY IF URL ALREADY EXISTS
    const { originURL } = req.body;
    const url = await URLModel.findOne({ originURL })
    if(url) {
      res.json(url)
      return
    }
    // Create a hash to the URL
    const hash = shortid.generate()
    const shortURL = `${config.API_URL}/${hash}`
    // Save URL to database
    const newURL = await URLModel.create({hash, shortURL, originURL})
    // Return the URL
    res.json(newURL)
  };

  public async redirect(req: Request, res: Response): Promise<void> {
    // get URL hash
    const { hash } = req.params;
    // find original URL using hash
    const url = await URLModel.findOne({ hash })
    // redirect to original URL
    if(url) {
      res.redirect(url.originURL);
      return;
    }

    res.status(400).json({ error: "URL NOT FOUND"})
  }
};