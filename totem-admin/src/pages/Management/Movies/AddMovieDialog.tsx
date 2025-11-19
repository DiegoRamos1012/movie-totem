import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { parseDisplayToDate, formatDate } from "@/utils/formatters";
import {
  MovieGenres,
  MovieGenresLabel,
  MovieRating,
} from "../../../../types/types";

type Props = {
  open: boolean;
  onClose: () => void;
};

const AddMovieDialog: React.FC<Props> = ({ open, onClose }) => {
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState<number | "">("");
  const [rating, setRating] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [movieStatus, setMovieStatus] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [direction, setDirection] = useState("");
  const [casting, setCasting] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setPosterFile(f);
    if (f) setPosterPreview(URL.createObjectURL(f));
    else setPosterPreview(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const clearForm = () => {
    setName("");
    setOriginalName("");
    setGenre("");
    setDuration("");
    setRating("");
    setReleaseDate("");
    setMovieStatus("");
    setActive(true);
    setDirection("");
    setCasting("");
    setSynopsis("");
    setPosterFile(null);
    setPosterPreview(null);
  };

  const handleSave = () => {
    // For now just log the form values. Integration with backend will be added later.
    console.log({
      name,
      originalName,
      genre,
      duration,
      rating,
      releaseDate,
      movieStatus,
      active,
      direction,
      casting,
      synopsis,
      posterFile,
    });
    clearForm();
  };

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!calendarRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    }

    if (calendarOpen) document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [calendarOpen]);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    setReleaseDate(formatted);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-6xl! p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl font-semibold">
            Adicionar Filme
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2 flex flex-col md:flex-row gap-6">
          {/* Left: image upload placeholder */}
          <div className="w-full md:w-79 flex items-center justify-center">
            <div
              className="w-full max-w-xs md:max-w-full h-48 md:h-115 rounded-lg border-dashed border-border border-2 flex items-center justify-center overflow-hidden bg-card"
              onClick={handleUploadClick}
              role="button"
              aria-label="Enviar imagem do filme"
            >
              {posterPreview ? (
                <img
                  src={posterPreview}
                  alt="Poster preview"
                  className="max-h-full w-auto object-contain"
                />
              ) : (
                <div className="text-center p-4 text-sm text-muted-foreground">
                  <div className="mb-2">Clique para enviar imagem</div>
                  <div className="text-xs">PNG, JPG até 2MB</div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Middle: form fields */}
          <div className="flex-1 space-y-3 text-sm">
            <div>
              <Label className="text-sm">Título</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div>
              <Label className="text-sm">Título original</Label>
              <Input
                value={originalName}
                onChange={(e) => setOriginalName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm">Gênero</Label>
                <Select
                  value={genre}
                  onValueChange={(val) => setGenre(val as MovieGenres)}
                >
                  <SelectTrigger className="w-full border rounded-md p-2 text-sm cursor-pointer">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(MovieGenres).map((c) => (
                      <SelectItem key={c} value={c}>
                        {MovieGenresLabel[c as MovieGenres]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Duração (min)</Label>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={String(duration)}
                  onChange={(e) =>
                    setDuration(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm">Classificação</Label>
                <Select value={rating} onValueChange={(val) => setRating(val)}>
                  <SelectTrigger className="w-full border rounded px-2 py-1">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "LIVRE",
                      "DEZ",
                      "DOZE",
                      "QUATORZE",
                      "DEZESSEIS",
                      "DEZOITO",
                    ].map((r) => (
                      <SelectItem key={r} value={r}>
                        {r === "LIVRE"
                          ? "Livre"
                          : `${MovieRating[r as keyof typeof MovieRating]}+`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm">Lançamento</Label>
                <div className="relative" ref={calendarRef}>
                  <Input
                    value={releaseDate}
                    onChange={handleDateInputChange}
                    placeholder="DD/MM/AAAA"
                  />

                  <Button
                    variant={"ghost"}
                    onClick={() => setCalendarOpen((s) => !s)}
                    className="absolute right-0.5 top-1/2 -translate-y-1/2 p-1"
                    aria-label="Abrir calendário"
                  >
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>

                  {calendarOpen && (
                    <div className="absolute right-0 mt-2 z-50 rounded-lg shadow-lg bg-card p-2">
                      <Calendar
                        mode="single"
                        locale={ptBR}
                        selected={parseDisplayToDate(releaseDate)}
                        onSelect={(date) => {
                          if (!date) return;
                          setReleaseDate(formatDate(date));
                          setCalendarOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-sm">Status</Label>
                <Input
                  value={movieStatus}
                  onChange={(e) => setMovieStatus(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 mt-6">
                <input
                  id="active"
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                />
                <Label htmlFor="active" className="text-sm">
                  Ativo
                </Label>
              </div>
            </div>

            <div>
              <Label className="text-sm">Direção</Label>
              <Input
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm">Elenco</Label>
              <Input
                value={casting}
                onChange={(e) => setCasting(e.target.value)}
              />
            </div>
          </div>

          {/* Right: synopsis */}
          <div className="w-full md:w-96">
            <ScrollArea className="h-48 md:h-72 rounded-lg border p-4">
              <h3 className="font-semibold mb-2">Sinopse</h3>
              <textarea
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                className="w-full h-full resize-none bg-transparent text-sm outline-none"
                placeholder="Escreva a sinopse do filme aqui..."
              />
            </ScrollArea>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0">
          <Button variant="ghost" onClick={onClose} className="mr-2">
            Fechar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMovieDialog;
