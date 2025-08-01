import prisma from "../../../prisma/client";

// Fungsi mock proses file
async function mockProcess(fileImportId: number) {
  // Update status: processing
  await prisma.fileImport.update({
    where: { id: fileImportId },
    data: { status: "processing" },
  });

  // Delay 5 detik
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Random success/fail
  const isSuccess = Math.random() > 0.2; // 80% chance success
  if (isSuccess) {
    await prisma.fileImport.update({
      where: { id: fileImportId },
      data: { status: "done", processedAt: new Date() },
    });
  } else {
    await prisma.fileImport.update({
      where: { id: fileImportId },
      data: { status: "failed", errorMsg: "Mock error processing file" },
    });
  }
}

// Worker utama (cek setiap interval)
export function startFileImportWorker() {
  setInterval(async () => {
    // Cari file dengan status pending/uploaded
    const file = await prisma.fileImport.findFirst({
      where: { status: { in: ["pending", "uploaded"] } },
      orderBy: { uploadedAt: "asc" },
    });
    if (file) {
      mockProcess(file.id);
    }
  }, 3000); // Cek setiap 3 detik
}
