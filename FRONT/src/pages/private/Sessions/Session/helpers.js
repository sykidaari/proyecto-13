export const normalizeMediaForBackend = (media, languageCode) => {
  const title =
    media.title ||
    media.titles?.get?.(languageCode) ||
    media.titles?.[languageCode] ||
    Object.values(media.titles || {})[0];

  const overview =
    typeof media.details?.overview === 'string'
      ? media.details.overview
      : media.details?.overview?.get?.(languageCode) ||
        media.details?.overview?.[languageCode];

  const streamingOptions =
    media.streamingOptions ||
    media.details?.streamingOptions?.map((opt) => ({
      country: opt.country,
      services: Array.isArray(opt.services)
        ? opt.services
        : Object.entries(opt.services || {}).map(([id, value]) => ({
            id,
            mediaLink: value.mediaLink
          }))
    }));

  return {
    mediaId: media.id || media._id,
    languageCode,

    media: {
      title,
      showType: media.showType,
      imageSet: media.imageSet,

      details: {
        releaseYear: media.details?.releaseYear,
        rating: media.details?.rating,
        runtime: media.details?.runtime,
        seasonCount: media.details?.seasonCount,

        directors: media.details?.directors,
        creators: media.details?.creators,
        cast: media.details?.cast,

        genres: media.details?.genres?.map((g) =>
          typeof g === 'object' ? g.id : g
        ),

        overview,

        streamingOptions
      }
    }
  };
};

export const normalizeMediaForUI = (media, languageCode) => {
  const title =
    media.title ||
    media.titles?.get?.(languageCode) ||
    media.titles?.[languageCode] ||
    Object.values(media.titles || {})[0];

  const overview =
    typeof media.details?.overview === 'string'
      ? media.details.overview
      : media.details?.overview?.get?.(languageCode) ||
        media.details?.overview?.[languageCode];

  const streamingOptions =
    media.streamingOptions ||
    media.details?.streamingOptions?.map((opt) => ({
      country: opt.country,
      services: Array.isArray(opt.services)
        ? opt.services
        : Object.entries(opt.services || {}).map(([id, value]) => ({
            id,
            mediaLink: value.mediaLink
          }))
    }));

  return {
    id: media._id,
    ...media,

    title,

    details: {
      ...media.details,

      overview,

      streamingOptions
    }
  };
};

// export const buildShowsToRender = (
//   newShows = [],
//   session,
//   currentUserId,
//   languageCode
// ) => {
//   if (!session) return [];
//   const discardedIds = new Set(
//     (session.discardedMedias || []).map((m) => String(m.mediaId))
//   );
//   const matchedIds = new Set(
//     (session.matchedMedias || []).map((m) => String(m._id))
//   );
//   const currentUserProposalIds = new Set(
//     session.participants
//       ?.find((p) => p.user?._id === currentUserId)
//       ?.matchProposals?.map((m) => String(m._id)) || []
//   );

//   const otherUsersMatchProposals = [
//     ...new Map(
//       session.participants
//         .filter((p) => p.user?._id !== currentUserId)
//         .flatMap((p) => p.matchProposals)
//         .map((m) => [String(m._id), m])
//     ).values()
//   ].map((media) => normalizeMediaForUI(media, languageCode));

//   const proposalsById = new Map(
//     otherUsersMatchProposals.map((m) => [String(m._id), m])
//   );
//   const showsToRender = [];
//   const remainingProposals = [...proposalsById.values()];
//   let proposalIndex = 0;
//   for (const show of newShows) {
//     const showId = String(show.id);
//     if (discardedIds.has(showId) || matchedIds.has(showId)) continue;
//     if (currentUserProposalIds.has(showId)) continue;
//     const proposal = proposalsById.get(showId);
//     if (proposal) {
//       showsToRender.push(proposal);
//       proposalsById.delete(showId);
//     } else {
//       showsToRender.push(show);
//     }
//     if (remainingProposals[proposalIndex]) {
//       const p = remainingProposals[proposalIndex];
//       const pid = String(p._id);
//       if (
//         !discardedIds.has(pid) &&
//         !matchedIds.has(pid) &&
//         !currentUserProposalIds.has(pid)
//       ) {
//         showsToRender.push(p);
//       }
//       proposalIndex++;
//     }
//   }
//   return showsToRender;
// };

export const buildShowsToRender = (
  newShows = [],
  session,
  currentUserId,
  languageCode
) => {
  if (!session) return [];

  const discardedShowIds =
    session.discardedMedias?.map((media) => media.mediaId) || [];

  const matchedShowIds = session.matchedMedias?.map((media) => media._id) || [];

  const otherUsersMatchProposals = [
    ...new Map(
      session.participants
        .filter((p) => p.user?._id !== currentUserId)
        .flatMap((p) => p.matchProposals)
        .map((m) => [m._id, m])
    ).values()
  ].map((media) => normalizeMediaForUI(media, languageCode));

  const proposalsById = new Map(
    otherUsersMatchProposals.map((m) => [String(m._id), m])
  );

  const currentUserProposalIds =
    session.participants
      .find((p) => p.user?._id === currentUserId)
      ?.matchProposals?.map((m) => String(m._id)) || [];

  currentUserProposalIds.forEach((id) => proposalsById.delete(id));

  const showsToRender = [];

  let proposalIndex = 0;

  for (const show of newShows) {
    if (
      discardedShowIds.includes(show.id) ||
      matchedShowIds.includes(show.id) ||
      currentUserProposalIds.includes(show.id)
    )
      continue;

    const proposal = proposalsById.get(show.id);

    if (proposal) {
      showsToRender.push(proposal);
      proposalsById.delete(show.id);
    } else {
      showsToRender.push(show);
    }

    const remainingProposals = [...proposalsById.values()];

    if (remainingProposals[proposalIndex]) {
      showsToRender.push(remainingProposals[proposalIndex]);
      proposalIndex++;
    }
  }

  return showsToRender;
};
