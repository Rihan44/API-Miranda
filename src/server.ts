import { app } from './app'
import { config } from './util/config'

app.listen(config.port, () =>
	console.log(`Server listening on http://localhost:${config.port}`)
)
