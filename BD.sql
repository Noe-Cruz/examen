CREATE TABLE usuarios (
    id INT(10) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    rfc VARCHAR(13) NOT NULL,
    contrasenia VARCHAR(80) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE estados (
    id INT(10) NOT NULL AUTO_INCREMENT,
    estado VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE colaboradores (
    id INT(10) NOT NULL AUTO_INCREMENT,
    nombre VARCHAR (50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    rfc VARCHAR(13) NOT NULL,
    domicilioFiscal VARCHAR(50) NOT NULL,
    curp VARCHAR (18) NOT NULL,
    noSeguro INT(11) NOT NULL,
    fechaInicio TIMESTAMP NOT NULL,
    tipoContrato VARCHAR(20) NOT NULL,
    departamento VARCHAR(20) NOT NULL,
    puesto VARCHAR(30) NOT NULL,
    salarioDiario DECIMAL(10,2) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    claveEntidad INT(3) NOT NULL,
    id_estado INT(10) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_estado) REFERENCES estados(id)
);

INSERT INTO estados (estado) VALUES
('Aguascalientes'),
('Baja California'),
('Baja California Sur'),
('Campeche'),
('Chiapas'),
('Chihuahua'),
('Ciudad de México'),
('Coahuila'),
('Colima'),
('Durango'),
('Guanajuato'),
('Guerrero'),
('Hidalgo'),
('Jalisco'),
('Estado de México'),
('Michoacán'),
('Morelos'),
('Nayarit'),
('Nuevo León'),
('Oaxaca'),
('Puebla'),
('Querétaro'),
('Quintana Roo'),
('San Luis Potosí'),
('Sinaloa'),
('Sonora'),
('Tabasco'),
('Tamaulipas'),
('Tlaxcala'),
('Veracruz'),
('Yucatán'),
('Zacatecas');
