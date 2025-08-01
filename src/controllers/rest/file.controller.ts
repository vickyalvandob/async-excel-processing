import { Request, Response } from "express";
import prisma from "../../../prisma/client";
import { buildPrismaWhere } from "../../helpers/prismaFilterBuilder";

// POST /api/upload
export const uploadFile = async (req: Request, res: Response) => {
  const file = req.file;
  // @ts-ignore
  const userId = req.user.userId;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  // Simpan data ke table FileImport
  await prisma.fileImport.create({
    data: {
      fileName: file.originalname,
      filePath: file.path, // simpan lokasi file di disk
      status: "pending",   // atau 'uploaded' sesuai preferensi
      uploadedBy: userId,
    },
  });

  res.json({ message: "File uploaded, processing in background" });
};

export const listFiles = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user.userId;

  // Ambil query param
  const {
    page = 1,
    rows = 10,
    orderKey = "uploadedAt",
    orderRule = "desc",
    filters,
    searchFilters,
    rangedFilters,
  } = req.query;

  // Build where filter
  const where = {
    ...buildPrismaWhere({ filters, searchFilters, rangedFilters }),
    uploadedBy: userId,
  };

  // Pagination
  const skip = (Number(page) - 1) * Number(rows);
  const take = Number(rows);

  // Sorting
  let orderBy: any = {};
  if (orderKey) {
    orderBy[orderKey as string] = (orderRule === "asc" ? "asc" : "desc");
  }

  // Query files dan total
  const [files, total] = await Promise.all([
    prisma.fileImport.findMany({
      where,
      skip,
      take,
      orderBy,
    }),
    prisma.fileImport.count({ where }),
  ]);

  res.json({
    data: files,
    pagination: {
      total,
      page: Number(page),
      rows: Number(rows),
      totalPages: Math.ceil(total / Number(rows)),
    },
  });
};
