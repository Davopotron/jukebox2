const { playlist } = require(".");
const prisma = require("../prisma");

const seed = async ( 
    numUsers = 5, 
    numPlaylists = 10,
    numTrack = 20
) => {
  const users = Array.from({ length: numUsers }, (_, i) => ({
    username: `User ${i + 1}`,
  }));
  await prisma.user.createMany({ data: users });

  const Tracks = Array.from({ length: numTracks }, (_, i) => ({
    name: `Track ${i + 1}`,
    playlists: `track${i + 1}@foo.bar`,
  }));
  await prisma.track.createMany({ data: tracks });

//   const numPlaylists = 8;
  for (let i = 0; i < numPlaylists; i++) {
    const catalogSize = 8 + Math.floor(Math.random() * tracks.length-1);
    const catalog = Array.from({ length: catalogSize }, () => ({
      id: Math.floor(Math.random() * numTracks )
    }));  

    await prisma.playlist.create({
      data: {
        name: new Date(Date.now()).toDateString(),
        userId: 1 + Math.floor(Math.random() * numUsers),
        catalog: { connect: catalog },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
