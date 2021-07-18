let Carros = [
	{
	  id: 1,
	  descricao: 'Fiat Toro',
	  img: 'https://image.freepik.com/vetores-gratis/imagens-animadas-abstratas-neon-lines_23-2148344065.jpg'
	},
	{
	  id: 2,
	  descricao: 'Fiat Argo',
	  img: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
	},
	{
	  id: 3,
	  descricao: 'Golf 2017',
	  img: 'https://cdn.eso.org/images/thumb700x/eso1907a.jpg'
	}
  ];
  var Images = React.createClass({
	render: function() {
	  return (
		<div>  {Carros.map(function(i){
				return (
				<div key={i.id}>
				  <h1>{i.id}</h1>
				  <span>{i.descricao}</span>
				  <img src={i.img} width='120' />
				  <span>{i.valor}</span>
				</div>
				);
		})}
	</div>
	)
  }
								 });
  ReactDOM.render(<Images />, document.getElementById('app'));