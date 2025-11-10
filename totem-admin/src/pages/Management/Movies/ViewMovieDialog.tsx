import React from 'react';

type ViewMovieDialogProps = {
	open: boolean;
	title?: string;
	children?: React.ReactNode;
	onClose?: () => void;
};

const overlayStyle: React.CSSProperties = {
	position: 'fixed',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	background: 'rgba(0,0,0,0.5)',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 1000,
};

const dialogStyle: React.CSSProperties = {
	background: '#fff',
	padding: 20,
	borderRadius: 8,
	minWidth: 320,
	maxWidth: '90%',
	boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
};

const headerStyle: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	marginBottom: 12,
};

const closeBtnStyle: React.CSSProperties = {
	border: 'none',
	background: 'transparent',
	fontSize: 20,
	lineHeight: 1,
	cursor: 'pointer',
};

export default function ViewMovieDialog({ open, title = 'Dialog de teste', children, onClose }: ViewMovieDialogProps) {
	if (!open) return null;

	return (
		<div style={overlayStyle} role="presentation" onClick={onClose}>
			<div style={dialogStyle} role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
				<div style={headerStyle}>
					<strong>{title}</strong>
					<button style={closeBtnStyle} aria-label="Fechar" onClick={onClose}>×</button>
				</div>

				<div>
					{children ?? <p>Conteúdo de teste do dialog.</p>}
				</div>

				<div style={{ marginTop: 12, textAlign: 'right' }}>
					<button onClick={onClose}>Fechar</button>
				</div>
			</div>
		</div>
	);
}