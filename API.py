@app.route('/api/services/search', methods=['GET'])
def search_services():
    query = request.args.get('q', '').lower()
    min_price = request.args.get('min_price', type=float)
    max_price = request.args.get('max_price', type=float)
    available = request.args.get('available', 'true').lower() == 'true'

    results = services

    if query:
        results = [s for s in results if query in s['title'].lower() or query in s['description'].lower()]
    if min_price is not None:
        results = [s for s in results if s['price'] >= min_price]
    if max_price is not None:
        results = [s for s in results if s['price'] <= max_price]
    if available:
        results = [s for s in results if s['availability']]

    return jsonify(results)
