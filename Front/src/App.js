import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './BarraPrincipal/navbar';
import Footer from './Footer/footer';
import Asistencia from './Asistencia/asistencia';
import Notas from './Notas/notas';
import Boletin from './Boletin/boletin';
import Materias from './Materias/materias';
import Avisos from './Avisos/avisos';
import Mensaje from './Mensaje/mensaje';
import InicioSesion from './InicioSesion/inicioSesion';
import Sidebar from './MenuLateral/sideMenu';
import Home from './Home/home';
import PlanDeEstudios from './MenuLateral/PlanDeEstudio/planDeEstudio';
import Beneficios from './MenuLateral/Beneficios/beneficios';
import Inscripcion from './MenuLateral/InscripcionOnline/inscripcion'
import Talleres from './MenuLateral/Talleres/talleres';
import Directivos from './MenuLateral/Directivos/directivos'
import ProximosEventos from './MenuLateral/ProximosEventos/eventos';
import Alumno from './Alumno/alumno'
import Profesor from './PaginaProfe/profesor';
import AsistenciaList from './PaginaProfe/Asistencia/asistenciaList';
import NotasExamenesList from './PaginaProfe/NotasExamen/notaList';
import { AlumnoProvider } from './Alumno/AlumnoContext';
import { AuthProvider } from './InicioSesion/tokenContext';
import AdminPage from './admin/admin';
import { ProfesorProvider } from './PaginaProfe/profesorContext';
import ProfeAvisos from './PaginaProfe/AvisosProfe/profeAvisos';
import MateriasProf from './PaginaProfe/Materias/materiasProf';
import { UsuarioProvider } from '../src/usuarioContext'
import Contacto from './Contacto/Contacto';
import NotasExamen from './PaginaProfe/NotasExamen/notasExamen';



const App = () => {

  // State para almacenar el nombre del usuario que inició sesión
  const [loggedInUser, setLoggedInUser] = useState('');

  const unreadAvisosCount = 0;
  const marcarAvisosComoLeidos = async () => {};

  // Función para actualizar el nombre del usuario cuando inicie sesión
  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const logout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    // Limpia loggedInUser
    setLoggedInUser('');

    // Redirige a /iniciarSesion
    window.location.href = '/iniciarSesion'; // Utiliza window.location.href para redirigir
  };



  return (
    <BrowserRouter>
      <UsuarioProvider>
        <ProfesorProvider>
          <AlumnoProvider>
            <AuthProvider>
              <div className="d-flex flex-column min-vh-100">
                <Navbar loggedInUser={loggedInUser} onLogout={logout}unreadAvisosCount={unreadAvisosCount} // Asegúrate de pasar el valor aquí
  marcarAvisosComoLeidos={marcarAvisosComoLeidos}
/>
                <div className="flex-grow-1">
                  <div className="container-fluid">
                    <div className="row">
                      {loggedInUser === "Admin" ? null : (
                        <div className="col-md-3">
                          <Sidebar />
                        </div>
                      )}
                      <div className="col-md-9">
                        {/* Contenido principal */}
                        <Routes>

                          <Route path="/iniciarSesion/*" element={<InicioSesion onLogin={handleLogin} />} />


                          <Route path="/" element={<Home />} />
                          {/* pagina alumno */}
                          <Route path="/notas" element={<Notas />} />
                          <Route path="/boletin" element={<Boletin loggedInUser={loggedInUser} />} />
                          <Route path="/materias" element={<Materias />} />
                          <Route path="/Asistencia" element={<Asistencia />} />
                          <Route path="/avisos" element={<Avisos />} />
                          <Route path="/mensaje" element={<Mensaje />} />

                          {/* pagina Home */}
                          <Route path="/contacto" element={<Contacto />} />
                          <Route path="/plan-de-estudio" element={<PlanDeEstudios />} />
                          <Route path="/beneficios" element={<Beneficios />} />
                          <Route path="/inscripcion-online" element={<Inscripcion />} />
                          <Route path="/directivos" element={<Directivos />} />
                          <Route path="/talleres" element={<Talleres />} />
                          <Route path="/proximos-eventos" element={<ProximosEventos />} />
                          <Route path="/alumno" element={<Alumno />} />


                          {/* pagina profesor */}
                          <Route path="/profesor" element={<Profesor />} />
                          <Route path="/Profmaterias" element={<MateriasProf />} />
                          <Route path="/ProfAsistencia" element={<AsistenciaList />} />
                          <Route path="/Profnotas" element={<NotasExamen />} />
                          <Route path="/ProfTrimestre" element={<NotasExamenesList />} />
                          <Route path="/ProfAvisos" element={<ProfeAvisos />} />
                          <Route path="/Profesor" element={<ProfesorProvider />} />

                          <Route path="/admin" element={<div className="center-content"> <AdminPage /> </div>} />


                        </Routes>
                      </div>
                    </div>
                  </div>
                </div>
                {loggedInUser !== "Admin" && (
                  <div className="footer">
                    <Footer />
                  </div>
                )}
              </div>
            </AuthProvider>
          </AlumnoProvider>
        </ProfesorProvider>
      </UsuarioProvider>
    </BrowserRouter>
  );
};

export default App;
