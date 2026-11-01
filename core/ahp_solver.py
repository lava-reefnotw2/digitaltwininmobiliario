from typing import List, Dict, Any

RANDOM_INDEX_TABLE = [0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49]

def solve_ahp_matrix(criteria: List[str], matrix: List[List[float]]) -> Dict[str, Any]:
    """
    Analytic Hierarchy Process (AHP) Solver.
    Computes priority weights, lambda max, Consistency Index (CI) and Consistency Ratio (CR).
    CR < 0.10 indicates acceptable consistency according to Saaty's theorem.
    """
    n = len(criteria)
    if n == 0 or len(matrix) != n:
        return {
            "criteria": criteria,
            "matrix": matrix,
            "weights": [],
            "consistencyIndex": 0.0,
            "consistencyRatio": 0.0,
            "isConsistent": True
        }

    # 1. Column sums
    col_sums = [0.0] * n
    for j in range(n):
        for i in range(n):
            col_sums[j] += matrix[i][j]

    # 2. Normalized matrix & Row averages (Weights)
    weights = [0.0] * n
    for i in range(n):
        row_sum = 0.0
        for j in range(n):
            denom = col_sums[j] if col_sums[j] != 0 else 1.0
            row_sum += matrix[i][j] / denom
        weights[i] = round(row_sum / n, 4)

    # 3. Estimate lambda max
    lambda_max = 0.0
    for j in range(n):
        lambda_max += col_sums[j] * weights[j]

    # 4. Consistency Index CI and Consistency Ratio CR
    ci = (lambda_max - n) / (n - 1) if n > 1 else 0.0
    ri = RANDOM_INDEX_TABLE[n] if n < len(RANDOM_INDEX_TABLE) else 1.5
    cr = ci / ri if ri > 0 else 0.0

    return {
        "criteria": criteria,
        "matrix": matrix,
        "weights": weights,
        "consistencyIndex": round(ci, 4),
        "consistencyRatio": round(cr, 4),
        "isConsistent": cr < 0.10
    }
