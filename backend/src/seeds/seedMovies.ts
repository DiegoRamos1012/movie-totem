import "reflect-metadata";
import { Movie, MovieRating } from "../models/Movie.js";
import { DataSource } from "typeorm";

export async function seedMovies(dataSource: DataSource) {
  const movieRepository = dataSource.getRepository(Movie);

  const movies: Partial<Movie>[] = [
    {
      name: "A Origem",
      originalName: "Inception",
      casting: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
      direction: "Christopher Nolan",
      synopsis:
        "Um ladrão especializado em invadir os sonhos das pessoas para roubar segredos corporativos recebe uma missão quase impossível: plantar uma ideia na mente de alguém.",
      genre: "Ficção Científica",
      duration: 148,
      rating: MovieRating.DOZE,
      releaseDate: new Date("2010-07-16"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
      active: true,
    },
    {
      name: "O Senhor dos Anéis: A Sociedade do Anel",
      originalName: "The Lord of the Rings: The Fellowship of the Ring",
      casting: "Elijah Wood, Ian McKellen, Viggo Mortensen",
      direction: "Peter Jackson",
      synopsis:
        "Um hobbit embarca em uma jornada épica para destruir um anel maligno e salvar a Terra Média das forças das trevas.",
      genre: "Fantasia",
      duration: 178,
      rating: MovieRating.DOZE,
      releaseDate: new Date("2001-12-19"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
      active: true,
    },
    {
      name: "O Cavaleiro das Trevas",
      originalName: "The Dark Knight",
      casting: "Christian Bale, Heath Ledger, Aaron Eckhart",
      direction: "Christopher Nolan",
      synopsis:
        "Batman enfrenta o Coringa, um criminoso caótico que ameaça mergulhar Gotham em completa anarquia.",
      genre: "Ação",
      duration: 152,
      rating: MovieRating.DEZESSEIS,
      releaseDate: new Date("2008-07-18"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      active: true,
    },
    {
      name: "Avatar",
      originalName: "Avatar",
      casting: "Sam Worthington, Zoe Saldaña, Sigourney Weaver",
      direction: "James Cameron",
      synopsis:
        "Em um futuro distante, um fuzileiro paraplégico é enviado a Pandora e se envolve com o povo Na'vi em meio a uma guerra entre espécies.",
      genre: "Ficção Científica",
      duration: 162,
      rating: MovieRating.DOZE,
      releaseDate: new Date("2009-12-18"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
      active: true,
    },
    {
      name: "Forrest Gump: O Contador de Histórias",
      originalName: "Forrest Gump",
      casting: "Tom Hanks, Robin Wright, Gary Sinise",
      direction: "Robert Zemeckis",
      synopsis:
        "A história de um homem simples com um coração puro que testemunha e influencia eventos históricos dos EUA sem perceber sua importância.",
      genre: "Drama",
      duration: 142,
      rating: MovieRating.DEZ,
      releaseDate: new Date("1994-07-06"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      active: true,
    },
    {
      name: "Interestelar",
      originalName: "Interstellar",
      casting: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      direction: "Christopher Nolan",
      synopsis:
        "Um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.",
      genre: "Ficção Científica",
      duration: 169,
      rating: MovieRating.DOZE,
      releaseDate: new Date("2014-11-07"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      active: true,
    },
    {
      name: "Gladiador",
      originalName: "Gladiator",
      casting: "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
      direction: "Ridley Scott",
      synopsis:
        "Um general romano é traído e busca vingança contra o imperador corrupto que assassinou sua família.",
      genre: "Ação",
      duration: 155,
      rating: MovieRating.DEZESSEIS,
      releaseDate: new Date("2000-05-05"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
      active: true,
    },
    {
      name: "Titanic",
      originalName: "Titanic",
      casting: "Leonardo DiCaprio, Kate Winslet, Billy Zane",
      direction: "James Cameron",
      synopsis:
        "Um jovem artista se apaixona por uma mulher da alta sociedade durante a trágica viagem inaugural do Titanic.",
      genre: "Romance",
      duration: 195,
      rating: MovieRating.DOZE,
      releaseDate: new Date("1997-12-19"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
      active: true,
    },
    {
      name: "Matrix",
      originalName: "The Matrix",
      casting: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
      direction: "The Wachowskis",
      synopsis:
        "Um hacker descobre que o mundo em que vive é uma simulação controlada por máquinas e decide lutar pela liberdade da humanidade.",
      genre: "Ficção Científica",
      duration: 136,
      rating: MovieRating.DEZESSEIS,
      releaseDate: new Date("1999-03-31"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
      active: true,
    },
    {
      name: "Clube da Luta",
      originalName: "Fight Club",
      casting: "Brad Pitt, Edward Norton, Helena Bonham Carter",
      direction: "David Fincher",
      synopsis:
        "Um homem insatisfeito com a vida corporativa forma um clube secreto onde homens se enfrentam para se sentirem vivos.",
      genre: "Drama",
      duration: 139,
      rating: MovieRating.DEZOITO,
      releaseDate: new Date("1999-10-15"),
      posterUrl:
        "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
      active: true,
    },
  ];

  // Inserir/atualizar individualmente para evitar dependência de constraint única
  for (const m of movies) {
    const existing = await movieRepository.findOne({
      where: { originalName: (m as any).originalName },
    });
    if (existing) {
      movieRepository.merge(existing, m);
      await movieRepository.save(existing);
    } else {
      await movieRepository.save(movieRepository.create(m));
    }
  }

  console.log("✅ 10 filmes inseridos ou atualizados com sucesso!");
}
