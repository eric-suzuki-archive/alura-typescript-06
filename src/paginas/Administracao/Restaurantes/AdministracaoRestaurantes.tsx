import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
    }

    return (
        </>
        <AppBar position="static">
                        <Container maxWidth="xl">
                            <Toolbar>
                                <Typography variant="h6">
                                    Administração
                                </Typography>
                                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                                    <Link component={RouterLink} to="/admin/restaurantes">
                                        <Button sx={{ my: 2, color: 'white' }}>
                                            Restaurantes
                                        </Button>
                                    </Link>
                                    <Link component={RouterLink} to="/admin/restaurantes/novo">
                                        <Button sx={{ my: 2, color: 'white' }}>
                                            Novo Restaurante
                                        </Button>
                                    </Link>
                                </Box>
                            </Toolbar>
                        </Container>
                    </AppBar>
        
                    <Box>
                        <Container maxWidth="lg" sx={{ mt: 1 }}>
                            <Paper sx={{ p: 2 }}>
                   
        
                <Box sx={{ display: 'flex', flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                    <Typography component="h1" variant="h6">Formulário de Restaurantes</Typography>
                    <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                        <TextField
                            value={nomeRestaurante}
                            onChange={evento => setNomeRestaurante(evento.target.value)}
                            label="Nome do Restaurante"
                            variant="standard"
                            fullWidth
                            required
                        />
                        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">Salvar</Button>
                    </Box>
                </Box>
                </Paper>
                        </Container>
                    </Box>
            </>

    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Nome
                    </TableCell>
                    <TableCell>
                        Editar
                    </TableCell>
                    <TableCell>
                        Excluir
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
                    <TableCell>
                        {restaurante.nome}
                    </TableCell>
                    <TableCell>
                        [ <Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link> ]
                    </TableCell>
                    <TableCell>
                        <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                            Excluir
                        </Button>
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default AdministracaoRestaurantes