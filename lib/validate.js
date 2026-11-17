const isHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const asString = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * Validates and normalizes a works payload coming from the admin form.
 * Returns `{ data }` on success or `{ errors }` keyed by field name.
 */
export function parseWorkInput(input) {
  const body = input && typeof input === 'object' ? input : {};
  const errors = {};

  const title = asString(body.title);
  if (!title) errors.title = 'Title is required.';
  else if (title.length > 160) errors.title = 'Title must be 160 characters or fewer.';

  const category = asString(body.category) || 'Other';
  if (category.length > 60) errors.category = 'Category must be 60 characters or fewer.';

  const live_link = asString(body.live_link);
  if (live_link && !isHttpUrl(live_link)) {
    errors.live_link = 'Live link must be a valid http(s) URL.';
  }

  const bgImage = asString(body.bgImage);
  if (bgImage && !bgImage.startsWith('/') && !isHttpUrl(bgImage)) {
    errors.bgImage = 'Cover image must be an uploaded blob URL or a path starting with "/".';
  }

  const overview = asString(body.overview);
  if (overview.length > 4000) errors.overview = 'Overview must be 4000 characters or fewer.';

  const description = asString(body.description);
  if (description.length > 300) errors.description = 'Description must be 300 characters or fewer.';

  const rawFeatures = Array.isArray(body.features)
    ? body.features
    : asString(body.features)
      ? body.features.split('\n')
      : [];

  const features = rawFeatures
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter(Boolean)
    .slice(0, 20);

  if (features.some((item) => item.length > 600)) {
    errors.features = 'Each highlight must be 600 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    data: {
      title,
      category,
      description,
      overview,
      features,
      live_link,
      bgImage,
      blobUrl: asString(body.blobUrl) || null,
    },
  };
}