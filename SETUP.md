
# Setup do Sistema de Monitoramento Industrial com Supabase

## 1. Configuração do Supabase

### Passo 1: Criar um novo projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma nova conta ou faça login
3. Clique em "New Project"
4. Escolha um nome para seu projeto
5. Aguarde a criação do projeto

### Passo 2: Configurar o banco de dados
1. Vá para a seção "SQL Editor" no painel do Supabase
2. Execute o script SQL localizado em `scripts/database-schema.sql`
3. Isso criará as tabelas `maquinas` e `leituras_sensores` com todos os índices necessários

### Passo 3: Obter as credenciais do projeto
1. Vá para "Settings" > "API"
2. Copie os seguintes valores:
   - **Project URL**
   - **anon/public key**

## 2. Configuração das Variáveis de Ambiente

### Criar arquivo `.env.local`
Na raiz do projeto, crie um arquivo `.env.local` com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=sua_project_url_aqui
VITE_SUPABASE_ANON_KEY=sua_anon_key_aqui
```

**⚠️ Importante:** Substitua os valores pelos dados do seu projeto Supabase.

## 3. Popular o Banco de Dados

### Executar o script de seed
Para popular o banco com dados fictícios de 3 máquinas e leituras históricas das últimas 24 horas:

```bash
# Primeiro, instale as dependências (se ainda não fez)
npm install

# Execute o script de seed
npm run seed
```

**Nota:** O script irá criar:
- 3 máquinas de exemplo
- Leituras de sensores a cada 10 minutos nas últimas 24 horas
- Anomalias simuladas na "Prensa Hidráulica 01" para demonstrar alertas

## 4. Executar o Projeto

```bash
npm run dev
```

O dashboard agora estará conectado ao Supabase e exibindo dados reais!

## 5. Estrutura dos Dados

### Tabela: maquinas
- `id`: UUID único da máquina
- `nome`: Nome da máquina (ex: "Prensa Hidráulica 01")
- `localizacao`: Local onde a máquina está instalada
- `created_at`: Data de criação do registro

### Tabela: leituras_sensores
- `id`: ID único da leitura
- `id_maquina`: Referência à máquina
- `temperatura`: Temperatura em °C
- `umidade`: Umidade relativa em %
- `vibracao_x`, `vibracao_y`, `vibracao_z`: Valores do ADC (0-4095) para vibração nos 3 eixos
- `timestamp_leitura`: Data e hora da leitura

## 6. Lógica de Alertas

O sistema gera alertas automaticamente baseado nos seguintes critérios:

### Temperatura:
- **Aviso**: > 85°C
- **Crítico**: > 95°C

### Vibração (média dos 3 eixos):
- **Aviso**: > 2500 unidades ADC
- **Crítico**: > 3000 unidades ADC

### RPM (calculado baseado na vibração):
- **Aviso**: < 1600 RPM ou > 1950 RPM

## 7. Próximos Passos

- Configure webhooks para receber dados reais de sensores IoT
- Implemente autenticação de usuários
- Adicione mais tipos de sensores e máquinas
- Configure notificações em tempo real
```
