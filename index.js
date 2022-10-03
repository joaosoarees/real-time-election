
const axios = require('axios') ;

(async () => {
  let i = true;

  while (i) {
    try {
      const { data: response } = await axios.get(
        'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json'
      );
  
      let resultado = [];
  
      response.cand.forEach(candidato => {
        const nomeCandidato = candidato.nm;
        const numeroVotos = new Intl.NumberFormat('pt-BR').format(candidato.vap);
        const percentualCandidato = `${candidato.pvap}%`;
        const numeroCandidato = candidato.n;
        const viceCandidato = candidato.nv;
  
        resultado.push({
          nomeCandidato,
          numeroVotos,
          percentualCandidato,
          numeroCandidato,
          viceCandidato,
        });
      });

      const options = {
        hour: 'numeric', minute: 'numeric', second: 'numeric',
      };

      console.log(`Resultado atualizado: ${new Intl.DateTimeFormat('pt-BR', options).format(Date.now())}`);
      console.table(resultado);

      await new Promise(resolve => setTimeout(() => resolve(), 60000));
    } catch(error) {
      console.error('Erro encontrado... Tentando novamente em 1 minuto', error.response.statusText);
    }
  }
})();
