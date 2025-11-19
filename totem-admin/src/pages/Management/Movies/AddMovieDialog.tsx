import React, { useState, useRef } from "react";
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
  const [rating, setRating] = useState<string>("LIVRE");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [movieStatus, setMovieStatus] = useState<string>("");
  const [active, setActive] = useState<boolean>(true);
  const [direction, setDirection] = useState("");
  const [casting, setCasting] = useState("");
  const [synopsis, setSynopsis] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setPosterFile(f);
    if (f) setPosterPreview(URL.createObjectURL(f));
    else setPosterPreview(null);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
    onClose();
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
          <div className="w-full md:w-80 flex items-center justify-center">
            <div
              className="w-full max-w-xs md:max-w-full h-48 md:h-96 rounded-lg border-dashed border-2 border-border flex items-center justify-center overflow-hidden bg-card"
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
                <Input
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>

              <div>
                <Label className="text-sm">Duração (min)</Label>
                <Input
                  type="number"
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
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="LIVRE">Livre</option>
                  <option value="10">10+</option>
                  <option value="12">12+</option>
                  <option value="14">14+</option>
                  <option value="16">16+</option>
                  <option value="18">18+</option>
                </select>
              </div>

              <div>
                <Label className="text-sm">Lançamento</Label>
                <Input
                  type="date"
                  value={releaseDate}
                  onChange={(e) => setReleaseDate(e.target.value)}
                />
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
