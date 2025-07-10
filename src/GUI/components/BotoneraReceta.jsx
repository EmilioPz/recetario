import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function BotoneraReceta({
  isEditing,
  recetaId,
  receta,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {isEditing ? (
        <>
          <Button
            variant="success"
            size="sm"
            onClick={() => onSave(recetaId)}
            className="me-1 mb-1 rounded-pill fw-semibold shadow-sm"
          >
            💾 Guardar
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onCancel}
            className="mb-1 rounded-pill fw-semibold shadow-sm"
          >
            ❌ Cancelar
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit(receta)}
            className="me-1 mb-1 rounded-pill fw-semibold shadow-sm"
          >
            ✏ Editar Imagen
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(recetaId)}
            className="me-1 mb-1 rounded-pill fw-semibold shadow-sm"
          >
            🗑 Eliminar
          </Button>
          <Button
            as={Link}
            to={`/receta/${recetaId}`}
            variant="info"
            size="sm"
            className="mb-1 rounded-pill fw-semibold shadow-sm"
          >
            👀 Ver Receta
          </Button>
        </>
      )}
    </div>
  );
}

export default BotoneraReceta;