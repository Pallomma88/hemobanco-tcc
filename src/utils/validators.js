function validarCPF(cpf) {
    if (!cpf) return false

    cpf = cpf.replace(/[^\d]/g, "")

    if (cpf.length !== 11) return false

    // rejeita CPFs com todos os dígitos iguais (111.111.111-11, etc)
    if (/^(\d)\1{10}$/.test(cpf)) return false

    const calcularDigito = (base, pesoInicial) => {
        let soma = 0
        for (let i = 0; i < base.length; i++) {
            soma += parseInt(base[i]) * (pesoInicial - i)
        }
        const resto = soma % 11
        return resto < 2 ? 0 : 11 - resto
    }

    const digito1 = calcularDigito(cpf.substring(0, 9), 10)
    const digito2 = calcularDigito(cpf.substring(0, 10), 11)

    return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10])
}

module.exports = {
    validarCPF
}