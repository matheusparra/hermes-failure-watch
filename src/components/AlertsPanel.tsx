import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface AlertsPanelProps {
  alerts: any[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default: return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': 
        return <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500">Crítico</Badge>;
      case 'warning': 
        return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500">Aviso</Badge>;
      default: 
        return <Badge variant="outline" className="text-blue-400 border-blue-500">Info</Badge>;
    }
  };

  if (alerts.length === 0) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Nenhum alerta ativo</h3>
            <p className="text-slate-400">Todos os equipamentos estão funcionando normalmente.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Alertas Ativos</h2>
        <Badge variant="outline" className="text-slate-300">
          {alerts.length} total
        </Badge>
      </div>

      <div className="grid gap-4">
        {alerts.map((alert, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getSeverityIcon(alert.severity)}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{alert.title}</h3>
                    {getSeverityBadge(alert.severity)}
                  </div>
                  
                  <p className="text-slate-400">{alert.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Equipamento: {alert.equipmentName}</span>
                    <span>•</span>
                    <span>Sensor: {alert.sensor}</span>
                    <span>•</span>
                    <span>Valor: {alert.value}</span>
                  </div>
                  
                  <div className="text-xs text-slate-500">
                    Detectado em: {alert.timestamp}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
