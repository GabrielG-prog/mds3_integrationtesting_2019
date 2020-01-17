const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
 * Génération des nouvelles couleurs et enregistrement de ces
 * couleurs dans un tableau.
 */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
    const nextColor = `${colorKey}${nextCursor}`
    newValues.push(nextColor)
    nextCursor++;
    return {
        'color': nextColor
    }
}
const getCurrentCulor = () => {
    return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}
// <-- FIN

it('should return all colors', () => {
    return chai.request(app)
        .get('/allcolors')
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.results).to.be.an('array');
        })
});

it('should return Bad Request', () => {
    return chai.request(app)
        .get('/nocolors')
        .catch((err) => {
            expect(err).to.have.status(404);
        });
})

it('should add new color', () => {
    return chai.request(app)
        .post('/addcolors')
        .send(payloadColor('black'))
        .then((res) => {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.results).to.be.an('array');
        })
});

it('should return new color list Request', () => {
    return chai.request(app)
        .get('/newlistcolors')
        .then((res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('object');
            expect(res.body.results).to.be.an('array');
        })
});
