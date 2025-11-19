export enum Roles {
  ADMIN = "admin",
  GERENTE = "gerente",
  FUNCIONARIO = "funcionario",
}

export enum MovieRating {
  LIVRE = "0",
  DEZ = "+10",
  DOZE = "+12",
  QUATORZE = "+14",
  DEZESSEIS = "+16",
  DEZOITO = "+18",
}
export enum MovieStatus {
  EM_EXIBICAO = "em_exibicao",
  PRE_VENDA = "pre_venda",
  FORA_DE_CARTAZ = "fora_de_cartaz",
}

export enum MovieGenres {
  ACAO = "Ação",
  AVENTURA = "Aventura",
  COMEDIA = "Comédia",
  DRAMA = "Drama",
  TERROR = "Terror",
  SUSPENSE = "Suspense",
  FICCAO_CIENTIFICA = "Ficção Científica",
  FANTASIA = "Fantasia",
  ROMANCE = "Romance",
  ANIMACAO = "Animação",
  DOCUMENTARIO = "Documentário",
  MUSICAL = "Musical",
}

export const MovieGenresLabel: Record<MovieGenres, string> = {
  [MovieGenres.ACAO]: "Ação",
  [MovieGenres.AVENTURA]: "Aventura",
  [MovieGenres.COMEDIA]: "Comédia",
  [MovieGenres.DRAMA]: "Drama",
  [MovieGenres.TERROR]: "Terror",
  [MovieGenres.SUSPENSE]: "Suspense",
  [MovieGenres.FICCAO_CIENTIFICA]: "Ficção Científica",
  [MovieGenres.FANTASIA]: "Fantasia",
  [MovieGenres.ROMANCE]: "Romance",
  [MovieGenres.ANIMACAO]: "Animação",
  [MovieGenres.DOCUMENTARIO]: "Documentário",
  [MovieGenres.MUSICAL]: "Musical",
};

export const MovieStatusLabel: Record<MovieStatus, string> = {
  [MovieStatus.EM_EXIBICAO]: "Em Exibição",
  [MovieStatus.PRE_VENDA]: "Em Pré-venda",
  [MovieStatus.FORA_DE_CARTAZ]: "Fora de Cartaz",
};

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;
}

export interface Movie {
  id: number;
  name: string;
  originalName: string;
  casting: string;
  direction: string;
  synopsis: string;
  genre: string;
  duration: number;
  rating: MovieRating;
  releaseDate: Date;
  posterUrl: string;
  movieStatus: MovieStatus;
  active: boolean;
}
