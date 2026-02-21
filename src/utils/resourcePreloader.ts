import { projects } from "../data/projects";

const loadedResources = new Set<string>();
let preloadingPromise: Promise<void> | null = null;

const IMAGE_EXTENSIONS = /\.(png|jpg|jpeg|gif|webp|svg|avif)$/i;

function getPreloadList() {
  return Array.from(
    new Set(
      projects
        .map((project) => project.image)
        .filter((url): url is string => Boolean(url && url.trim().length > 0))
    )
  );
}

function preloadImage(url: string) {
  return new Promise<void>((resolve) => {
    if (loadedResources.has(url)) {
      resolve();
      return;
    }

    const image = new Image();
    image.onload = () => {
      loadedResources.add(url);
      resolve();
    };
    image.onerror = () => resolve();
    image.src = url;
  });
}

function preloadResource(url: string) {
  if (IMAGE_EXTENSIONS.test(url)) {
    return preloadImage(url);
  }

  return Promise.resolve();
}

async function performPreload(onProgress?: (progress: number) => void) {
  const resources = getPreloadList();

  if (resources.length === 0) {
    onProgress?.(100);
    return;
  }

  let loadedCount = 0;
  onProgress?.(0);

  await Promise.all(
    resources.map(async (resource) => {
      await preloadResource(resource);
      loadedCount += 1;
      const progress = Math.round((loadedCount / resources.length) * 100);
      onProgress?.(Math.min(progress, 100));
    })
  );
}

export async function preloadPortfolioResources(onProgress?: (progress: number) => void) {
  if (!preloadingPromise) {
    preloadingPromise = performPreload(onProgress);
  } else {
    await preloadingPromise;
  }

  onProgress?.(100);
}
