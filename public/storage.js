// Debe cargarse antes que la app: sustituye la base de datos de Claude
// por el almacenamiento del navegador, con la misma forma de API.
(function () {
  const PREFIX = 'dominio-corporal:';

  function makeDoc(path) {
    const key = PREFIX + path;
    return {
      async get() {
        let value = null;
        try {
          const raw = localStorage.getItem(key);
          if (raw !== null) value = JSON.parse(raw);
        } catch (e) {
          value = null;
        }
        return { exists: value !== null, data: () => value };
      },
      async set(value) {
        localStorage.setItem(key, JSON.stringify(value));
      },
      async delete() {
        localStorage.removeItem(key);
      }
    };
  }

  window.claude = {
    use: async (capability) => (capability === 'db' ? { doc: makeDoc } : null)
  };
})();
