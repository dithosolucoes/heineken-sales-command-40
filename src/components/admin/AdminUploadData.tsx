
import { useState } from "react";
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle, X, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Tipos para os dados de upload
interface UploadFile {
  id: string;
  name: string;
  date: string;
  status: 'processing' | 'success' | 'error';
  type: 'vendedores' | 'pdvs' | 'missoes';
  size: string;
  records?: number;
}

interface PreviewData {
  headers: string[];
  rows: Record<string, any>[];
}

const AdminUploadData = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<PreviewData | null>(null);
  const [processingUpload, setProcessingUpload] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Lista de uploads anteriores (simulado)
  const [previousUploads] = useState<UploadFile[]>([
    {
      id: "1",
      name: "vendedores-maio-2025.csv",
      date: "2025-05-01",
      status: "success",
      type: "vendedores",
      size: "2.3 MB",
      records: 48
    },
    {
      id: "2",
      name: "pdvs-atualizado-maio.xlsx",
      date: "2025-05-05",
      status: "success",
      type: "pdvs",
      size: "5.7 MB",
      records: 542
    },
    {
      id: "3",
      name: "missoes-maio-semana1.csv",
      date: "2025-05-06",
      status: "success",
      type: "missoes",
      size: "1.8 MB",
      records: 124
    },
    {
      id: "4",
      name: "vendedores-abril-final.xlsx",
      date: "2025-04-30",
      status: "error",
      type: "vendedores",
      size: "2.1 MB"
    }
  ]);
  
  // Função para lidar com a seleção de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      
      // Gera dados simulados para o preview
      generatePreviewData(e.target.files[0]);
    }
  };
  
  // Gera dados simulados para o preview
  const generatePreviewData = (file: File) => {
    // Simulando dados com base no tipo de arquivo
    const headers = ["ID", "Nome", "Região", "Tipo", "Status"];
    
    const rows = [
      { ID: "1", Nome: "Carlos Silva", Região: "Zona Sul", Tipo: "Vendedor", Status: "Ativo" },
      { ID: "2", Nome: "Ana Oliveira", Região: "Centro", Tipo: "Vendedor", Status: "Ativo" },
      { ID: "3", Nome: "Roberto Santos", Região: "Zona Norte", Tipo: "Supervisor", Status: "Ativo" },
      { ID: "4", Nome: "Juliana Costa", Região: "Zona Oeste", Tipo: "Vendedor", Status: "Inativo" },
      { ID: "5", Nome: "Fernando Lima", Região: "Zona Sul", Tipo: "Supervisor", Status: "Ativo" }
    ];
    
    setCurrentPreview({ headers, rows });
  };
  
  // Função para iniciar o upload
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setProcessingUpload(true);
    
    // Simulando progresso de upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setProcessingUpload(false);
        setSelectedFile(null);
        setUploadProgress(0);
        
        toast({
          title: "Upload concluído com sucesso",
          description: "Os dados foram importados para o sistema.",
        });
      }
    }, 500);
  };
  
  // Função para abrir o preview de um upload anterior
  const openPreviousUploadPreview = (upload: UploadFile) => {
    // Simula a obtenção dos dados deste upload
    const headers = ["ID", "Nome", "Região", "Tipo", "Status"];
    
    const rows = [
      { ID: "1", Nome: "Carlos Silva", Região: "Zona Sul", Tipo: "Vendedor", Status: "Ativo" },
      { ID: "2", Nome: "Ana Oliveira", Região: "Centro", Tipo: "Vendedor", Status: "Ativo" },
      { ID: "3", Nome: "Roberto Santos", Região: "Zona Norte", Tipo: "Supervisor", Status: "Ativo" }
    ];
    
    setCurrentPreview({ headers, rows });
    setPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-heineken">Upload de Dados</h2>
      
      {/* Área de upload */}
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white">Importar Nova Planilha</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center p-6 border-2 border-dashed border-tactical-silver/30 rounded-md text-center">
            <Upload className="h-10 w-10 text-tactical-silver mb-4" />
            <p className="text-tactical-silver mb-2">
              Arraste e solte arquivos CSV ou Excel aqui, ou clique para selecionar
            </p>
            <p className="text-xs text-tactical-silver/70 mb-4">
              Formatos suportados: .csv, .xlsx, .xls (Máx. 10MB)
            </p>
            
            <div className="w-full max-w-xs">
              <Label htmlFor="file-upload" className="sr-only">Selecionar arquivo</Label>
              <Input
                id="file-upload"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button 
                onClick={() => document.getElementById('file-upload')?.click()}
                className="bg-heineken text-black hover:bg-heineken/80 w-full"
              >
                Selecionar Arquivo
              </Button>
            </div>
          </div>
          
          {selectedFile && (
            <div className="mt-6">
              <Card className="bg-tactical-black/70 border-tactical-silver/30">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FileSpreadsheet className="h-6 w-6 text-heineken mr-3" />
                      <div>
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-xs text-tactical-silver">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-tactical-silver hover:text-white"
                        onClick={() => setPreviewOpen(true)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-tactical-silver hover:text-white"
                        onClick={() => setSelectedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {processingUpload && (
                    <div className="mt-4">
                      <p className="text-xs text-tactical-silver mb-1">
                        Enviando... {uploadProgress}%
                      </p>
                      <div className="w-full bg-tactical-darkgray h-2 rounded-full">
                        <div 
                          className="bg-heineken h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {!processingUpload && (
                <div className="flex justify-end mt-4 space-x-3">
                  <Button 
                    variant="outline"
                    className="text-tactical-silver border-tactical-silver hover:text-white"
                    onClick={() => setSelectedFile(null)}
                  >
                    Cancelar
                  </Button>
                  <Button 
                    className="bg-heineken text-black hover:bg-heineken/80"
                    onClick={handleUpload}
                  >
                    Importar Dados
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Lista de uploads anteriores */}
      <Card className="bg-tactical-darkgray/80 border-heineken/30">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-white">Uploads Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-tactical-darkgray/90 border-b border-heineken/20">
                  <TableHead className="text-tactical-silver">Arquivo</TableHead>
                  <TableHead className="text-tactical-silver">Tipo</TableHead>
                  <TableHead className="text-tactical-silver">Data</TableHead>
                  <TableHead className="text-tactical-silver">Tamanho</TableHead>
                  <TableHead className="text-tactical-silver">Registros</TableHead>
                  <TableHead className="text-tactical-silver">Status</TableHead>
                  <TableHead className="text-tactical-silver text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previousUploads.map((upload) => (
                  <TableRow 
                    key={upload.id} 
                    className="hover:bg-tactical-darkgray/90 border-b border-tactical-darkgray/30"
                  >
                    <TableCell className="text-white font-medium">{upload.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        upload.type === 'vendedores' ? 'bg-blue-900/50 text-blue-300' : 
                        upload.type === 'pdvs' ? 'bg-green-900/50 text-green-300' : 
                        'bg-yellow-900/50 text-yellow-300'
                      }`}>
                        {upload.type === 'vendedores' ? 'Vendedores' : 
                         upload.type === 'pdvs' ? 'PDVs' : 'Missões'}
                      </span>
                    </TableCell>
                    <TableCell className="text-tactical-silver">{upload.date}</TableCell>
                    <TableCell className="text-tactical-silver">{upload.size}</TableCell>
                    <TableCell className="text-tactical-silver">
                      {upload.records ? upload.records : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {upload.status === 'success' ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-green-500">Sucesso</span>
                          </>
                        ) : upload.status === 'error' ? (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                            <span className="text-red-500">Erro</span>
                          </>
                        ) : (
                          <span className="text-yellow-500">Processando</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-tactical-silver hover:text-white h-8 w-8 p-0"
                          onClick={() => openPreviousUploadPreview(upload)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Visualizar</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-tactical-silver hover:text-white h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Dialog para preview */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="bg-tactical-darkgray text-white border-heineken/30 sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-heineken">Preview dos Dados</DialogTitle>
            <DialogDescription className="text-tactical-silver">
              Visualização dos primeiros registros da planilha
            </DialogDescription>
          </DialogHeader>
          
          <div className="overflow-x-auto max-h-96">
            {currentPreview && (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-tactical-darkgray border-b border-heineken/20">
                    {currentPreview.headers.map((header, index) => (
                      <TableHead key={index} className="text-heineken">{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPreview.rows.map((row, rowIndex) => (
                    <TableRow 
                      key={rowIndex} 
                      className="hover:bg-tactical-darkgray/90 border-b border-tactical-darkgray/30"
                    >
                      {currentPreview.headers.map((header, colIndex) => (
                        <TableCell key={colIndex} className="text-tactical-silver">
                          {row[header]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <DialogClose asChild>
              <Button className="bg-heineken text-black hover:bg-heineken/80">
                Fechar
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUploadData;
