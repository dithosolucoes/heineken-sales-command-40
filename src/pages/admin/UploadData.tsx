
import { useState } from "react";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminUploadData = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUpload(files[0]);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadComplete(false);
    
    // Simulando o upload com um timeout
    setTimeout(() => {
      setIsUploading(false);
      setUploadComplete(true);
      
      toast({
        title: "Upload concluído",
        description: `Arquivo ${file.name} processado com sucesso!`,
        variant: "default",
      });
    }, 2000);
  };

  return (
    <DashboardLayout userType="admin" pageTitle="Upload de Dados">
      <div className="container mx-auto px-4 py-6">
        <Card className="bg-tactical-darkgray/80 border-heineken/30">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-white flex items-center">
              <Upload size={20} className="mr-2 text-heineken" />
              Upload de Arquivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="bg-tactical-black/50 border-2 border-dashed border-heineken/30 rounded-lg p-10 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  {!uploadComplete ? (
                    <>
                      <Upload className="h-12 w-12 text-tactical-silver" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white">Arraste arquivos aqui ou clique para selecionar</h3>
                        <p className="text-sm text-tactical-silver">
                          Suporta arquivos CSV, XLSX até 10MB
                        </p>
                      </div>
                      <div>
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          accept=".csv,.xlsx"
                          onChange={handleFileChange}
                          disabled={isUploading}
                        />
                        <label htmlFor="file-upload">
                          <Button
                            variant="outline" 
                            className="border-heineken text-heineken hover:bg-heineken hover:text-black"
                            disabled={isUploading}
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            {isUploading ? "Processando..." : "Selecionar Arquivo"}
                          </Button>
                        </label>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-12 w-12 text-heineken" />
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white">Upload concluído com sucesso</h3>
                        <p className="text-sm text-tactical-silver">
                          Os dados foram processados e estão disponíveis no sistema
                        </p>
                      </div>
                      <Button
                        variant="outline" 
                        className="border-heineken text-heineken hover:bg-heineken hover:text-black"
                        onClick={() => {
                          setUploadComplete(false);
                          document.getElementById("file-upload")?.click();
                        }}
                      >
                        Fazer outro Upload
                      </Button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-base font-medium text-white">Instruções:</h3>
                <ul className="list-disc space-y-2 pl-5 text-sm text-tactical-silver">
                  <li>Os arquivos devem estar no formato CSV ou XLSX</li>
                  <li>Verifique se todas as colunas obrigatórias estão presentes</li>
                  <li>O tamanho máximo permitido é de 10MB</li>
                  <li>Dados sensíveis devem ser omitidos dos arquivos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminUploadData;
